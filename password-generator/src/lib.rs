use wasm_bindgen::prelude::*;
use rand::{Rng, SeedableRng, rngs::StdRng};
use sha2::{Sha512, Digest};

#[wasm_bindgen]
pub fn generate_password(
    pass: String, 
    chars: String,
    length: u32
) -> String {
    if chars.len() == 0 || length == 0 {
        return "".to_owned();
    }

    let mut hasher = Sha512::new();
    hasher.update(pass.as_bytes());
    let hash_result = hasher.finalize();

    let hash_bytes: [u8; 64] = hash_result.into();

    let mut hash_bytes_1: [u8; 32] = [0; 32];
    let mut hash_bytes_2: [u8; 32] = [0; 32];
    hash_bytes_1.copy_from_slice(&hash_bytes[..32]);
    hash_bytes_2.copy_from_slice(&hash_bytes[32..]);

    let mut rng1 = StdRng::from_seed(hash_bytes_1);
    let mut rng2 = StdRng::from_seed(hash_bytes_2);

    let mut generated = String::new();
    for i in 0..length {
        let rng = if i%2 == 0 {&mut rng1} else {&mut rng2};

        let index: usize = rng.gen_range(0..chars.len());
        generated += &chars.chars().nth(index).unwrap().to_string();
    }

    generated
}

#[cfg(test)]
mod tests {
    use crate::generate_password;

    #[test]
    fn empty_chars() {
        // Checks for null char behaviour
        let gen = generate_password("password".to_owned(), "".to_owned(), 32);
        assert_eq!(gen, "".to_owned());
    }

    #[test]
    fn compatibility_check() {
        // A critical compatibility check, to make sure the algorithm produces the same result
        // If this fails - it means you're generator acts differently
        let chars: String = "0123456789ABCDEF".to_owned();

        let gen1 = generate_password("hello world".to_owned(), chars.clone(), 16);
        let gen2 = generate_password("hello world".to_owned(), chars.clone(), 15);
        let gen3 = generate_password("hello world".to_owned(), chars.clone(), 17);
        let gen4 = generate_password("".to_owned(), chars.clone(), 16);

        assert_eq!(gen1, "DD475C957808403B");
        assert_eq!(gen2, "DD475C957808403");
        assert_eq!(gen3, "DD475C957808403BC");
        assert_eq!(gen4, "8F3F0D406051BAF8");
    }
}