import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://waqekoulmnxwmcbnqcdb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhcWVrb3VsbW54d21jYm5xY2RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyMjA5NzEsImV4cCI6MjAzNjc5Njk3MX0.y9KaG0Aq-7yfyfmo_BpQRMCU6MfG1CdoSYF4fD_bGiM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
