import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import appLogo from "../../images/appLogo.png";

function FormLog() {
    return (
    <div className='form_box'>
        <img
                alt=""
                src={appLogo}
                width="60"
                height="60"
                className="d-inline-block align-top"
            />{' '}
        <br/>
        <br/>
        <h2>Acesse sua conta</h2>
        <br/>
        <Form className='login_form'>
            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Usuário:</Form.Label>
            <Form.Control type="text" maxLength={30} placeholder="Digite seu usuário." />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha:</Form.Label>
            <Form.Control type="password" maxLength={30} placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Lembrar-se de mim" />
            </Form.Group>
            <Button variant="primary" type="submit">
            Entrar
            </Button>
            <br/>
            <Form.Text className="text-muted">
                Se for sua primeira vez use a senha padrão.
            </Form.Text>
        </Form>
    </div>
    );
}

export default FormLog;