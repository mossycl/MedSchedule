import { Paciente } from './paciente';

describe('Paciente', () => {
  it('should create an instance', () => {
    expect(new Paciente(0,"","","","","",0,0)).toBeTruthy();
  });
});
