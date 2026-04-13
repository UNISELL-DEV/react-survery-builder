export interface PatientVital {
  id: number;
  patient_id: number;
  height?: number;
  weight?: number;
  blood_pressure_systolic?: number;
  blood_pressure_diastolic?: number;
  heart_rate?: number;
  temperature?: number;
  respiratory_rate?: number;
  bmi?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}
