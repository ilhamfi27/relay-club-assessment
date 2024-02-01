export default () => ({
  port: parseInt(process.env.PORT, 10) || 1321,
  supabase: {
    supabaseUrl: process.env.SUPABASE_URL || 'http://localhost:8000',
    supabaseKey: process.env.SUPABASE_KEY,
  },
});
