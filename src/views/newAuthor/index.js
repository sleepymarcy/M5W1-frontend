import React, { Component } from "react"
import { Container, Form, Button, Col, Card, Row } from "react-bootstrap"
import "./styles.css"

export default class NewAuthor extends Component {

    constructor(props) {
        super(props);
        this.state = { name: "", surname: "", email: "", authors: [] }
    }

    getAuthorList = async () => {
        try {
            let response = await fetch("http://localhost:3001/authors");
            let authorsList = await response.json();
            this.setState({ authors: authorsList });
            console.log(this.state.authors);
            return authorsList;
        } catch (error) {
            console.log(error);
        }
    };

    createAuthor = async () => {
        try {
            let response = await fetch("http://localhost:3001/authors", {
                method: "POST",
                body: JSON.stringify({
                    name: this.state.name,
                    surname: this.state.surname,
                    email: this.state.email,
                    avatar:
                        "https://coursereport-production.imgix.net/uploads/school/logo/1045/original/Strive_-_logosquareblack.png?w=200&h=200&dpr=1&q=75",
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                console.log(response.json());
            }
        } catch (error) {
            console.log(error);
        }
    };

    componentDidMount() {
        this.getAuthorList();
    }


    sendAuthor = (e) => {
        e.preventDefault();
        this.createAuthor();
        this.getAuthorList();
    }

    render() {
        return (
            <Container className="new-blog-container">
                <Row>
                    <Col className="col-9">
                        <Form className="mt-5" onSubmit={this.sendAuthor}>
                            <Form.Group controlId="blog-form" className="mt-3">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    size="lg"
                                    placeholder="First name"
                                    onChange={(e) => this.setState({ name: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="blog-form" className="mt-3">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control
                                    size="lg"
                                    placeholder="Surname"
                                    onChange={(e) => this.setState({ surname: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="blog-form" className="mt-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    size="lg"
                                    placeholder="Email"
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="d-flex mt-3 justify-content-end">
                                <Button type="reset" size="lg" variant="outline-dark">
                                    Reset
                                </Button>
                                <Button
                                    type="submit"
                                    size="lg"
                                    variant="dark"
                                    style={{ marginLeft: "1em" }}
                                >
                                    Submit
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col className="col-3">
                        <div className="mt-5">
                            <Card body>
                                <h4>Authors</h4>
                            </Card>
                            {this.state.authors.map((author) => (
                                <Card body key={author.id}>
                                    {author.name} {author.surname}
                                </Card>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}