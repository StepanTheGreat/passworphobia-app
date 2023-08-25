// Copyright © 2023 August, Perfect Duo. All rights reserved.
import * as wasm from "./password_generator_bg.wasm";
import { __wbg_set_wasm } from "./password_generator_bg.js";
__wbg_set_wasm(wasm);
export * from "./password_generator_bg.js";
