import { CitaMedica } from './cita-medica';

describe('CitaMedica', () => {
  it('should create an instance', () => {
    
    expect(new CitaMedica(1,1,2001,"12:00")).toBeTruthy();
  });
});
