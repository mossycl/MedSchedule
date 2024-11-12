import { SignupForm } from "./signup.page.form"
import { FormBuilder} from "@angular/forms";

describe('SignupForm', () =>{
    let form : SignupForm;

    beforeEach(async () => {
        form = new SignupForm(new FormBuilder)
    })

    it('should create form', () => {
        const formGroup = form.createForm();
        expect(formGroup).toBeTruthy();
    });

    it('should check if required inputs are not empty', () => {
        const formGroup = form.createForm();

        formGroup.setValue({
            firstName : "",
            secondName: "",
            lastName : "",
            secondLastName : "",
            run : "",
            email : "",
            phone : "",
            pw1: "",
            pw2 : ""
        })

        expect(formGroup.valid).toBeFalsy()
    })

    it('should check if email is valid', () => {
        const formGroup = form.createForm();

        formGroup.setValue({
            firstName : "Juan",
            secondName: "Juan",
            lastName : "Juan",
            secondLastName : "Juan",
            run : "18007012-5",
            email : "alguiencorreo.com",    // not valid
            phone : 123456789,
            pw1: "abcdefg123",
            pw2 : "abcdefg123"
        })

        expect(formGroup.valid).toBeFalsy()
    })

    it('should check if run is valid', () => {
        const formGroup = form.createForm();

        formGroup.setValue({
            firstName : "Juan",
            secondName: "Juan",
            lastName : "Juan",
            secondLastName : "Juan",
            run : "18007012-4",     // not valid
            email : "alguien@correo.com",
            phone : 123456789,
            pw1: "abcdefg123",
            pw2 : "abcdefg123"
        })

        expect(formGroup.valid).toBeFalsy()
    })

    it('should pass if not required inputs are empty', () => {
        const formGroup = form.createForm();

        formGroup.setValue({
            firstName : "Juan",
            secondName: "",
            lastName : "Juan",
            secondLastName : "",
            run : "18007012-4",
            email : "alguien@correo.com",
            phone : 123456789,
            pw1: "abcdefg123",
            pw2 : "abcdefg123"
        })

        expect(formGroup.valid).toBeTruthy()
    })
})