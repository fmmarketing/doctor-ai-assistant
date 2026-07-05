-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users cannot delete profiles (for now)
-- No DELETE policy = no one can delete profiles

-- Enable RLS on patients table
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- Policy: Doctors can only view their own patients
CREATE POLICY "Doctors can view own patients" ON patients
  FOR SELECT USING (auth.uid() = doctor_id);

-- Policy: Doctors can insert their own patients
CREATE POLICY "Doctors can insert own patients" ON patients
  FOR INSERT WITH CHECK (auth.uid() = doctor_id);

-- Policy: Doctors can update their own patients
CREATE POLICY "Doctors can update own patients" ON patients
  FOR UPDATE USING (auth.uid() = doctor_id);

-- Policy: Doctors can delete their own patients
CREATE POLICY "Doctors can delete own patients" ON patients
  FOR DELETE USING (auth.uid() = doctor_id);

-- Enable RLS on encounters table
ALTER TABLE encounters ENABLE ROW LEVEL SECURITY;

-- Policy: Doctors can only view their own encounters
CREATE POLICY "Doctors can view own encounters" ON encounters
  FOR SELECT USING (auth.uid() = doctor_id);

-- Policy: Doctors can insert their own encounters
CREATE POLICY "Doctors can insert own encounters" ON encounters
  FOR INSERT WITH CHECK (auth.uid() = doctor_id);

-- Policy: Doctors can update their own encounters
CREATE POLICY "Doctors can update own encounters" ON encounters
  FOR UPDATE USING (auth.uid() = doctor_id);

-- Policy: Doctors can delete their own encounters
CREATE POLICY "Doctors can delete own encounters" ON encounters
  FOR DELETE USING (auth.uid() = doctor_id);

-- Enable RLS on clinical_notes table
ALTER TABLE clinical_notes ENABLE ROW LEVEL SECURITY;

-- Policy: Doctors can only view their own notes
CREATE POLICY "Doctors can view own notes" ON clinical_notes
  FOR SELECT USING (auth.uid() = doctor_id);

-- Policy: Doctors can insert their own notes
CREATE POLICY "Doctors can insert own notes" ON clinical_notes
  FOR INSERT WITH CHECK (auth.uid() = doctor_id);

-- Policy: Doctors can update their own notes
CREATE POLICY "Doctors can update own notes" ON clinical_notes
  FOR UPDATE USING (auth.uid() = doctor_id);

-- Policy: Doctors can delete their own notes
CREATE POLICY "Doctors can delete own notes" ON clinical_notes
  FOR DELETE USING (auth.uid() = doctor_id);

-- Enable RLS on audio_sessions table
ALTER TABLE audio_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Doctors can only view their own audio sessions
CREATE POLICY "Doctors can view own audio sessions" ON audio_sessions
  FOR SELECT USING (auth.uid() = doctor_id);

-- Policy: Doctors can insert their own audio sessions
CREATE POLICY "Doctors can insert own audio sessions" ON audio_sessions
  FOR INSERT WITH CHECK (auth.uid() = doctor_id);

-- Policy: Doctors can update their own audio sessions
CREATE POLICY "Doctors can update own audio sessions" ON audio_sessions
  FOR UPDATE USING (auth.uid() = doctor_id);

-- Policy: Doctors can delete their own audio sessions
CREATE POLICY "Doctors can delete own audio sessions" ON audio_sessions
  FOR DELETE USING (auth.uid() = doctor_id);

-- Enable RLS on audit_logs table
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Doctors can only view their own audit logs
CREATE POLICY "Doctors can view own audit logs" ON audit_logs
  FOR SELECT USING (auth.uid() = doctor_id);

-- Policy: Doctors can insert their own audit logs
CREATE POLICY "Doctors can insert own audit logs" ON audit_logs
  FOR INSERT WITH CHECK (auth.uid() = doctor_id);

-- No UPDATE or DELETE on audit_logs (immutable)
