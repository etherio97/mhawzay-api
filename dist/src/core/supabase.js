"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSupabase = exports.supabase = void 0;
const config_1 = require("@mhawzay/config");
const supabase_js_1 = require("@supabase/supabase-js");
function initializeSupabase() {
    exports.supabase = new supabase_js_1.SupabaseClient(config_1.SUPABASE_URL, config_1.SUPABASE_SECRET);
    return exports.supabase;
}
exports.initializeSupabase = initializeSupabase;
