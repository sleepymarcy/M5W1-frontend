import React, { useState, useEffect } from "react";
import {
  Container,
  Image,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author"
import "./styles.css";

const Blog = ({ match }) => {
  const { id } = match.params;

  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ text: "", userName: "" });



  const fetchPosts = async (id) => {
    try {
      let response = await fetch(`http://localhost:3001/blogs/${id}`);
      let blogItem = await response.json();
      setBlog(blogItem);
      setLoading(false);
      return blogItem;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async (id) => {
    try {
      let response = await fetch(
        `http://localhost:3001/blogs/${id}/comments`
      )
      let blogComments = await response.json();
      setComments(blogComments);
      // setLoading(false);
      console.log(blogComments);
      return blogComments;
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    console.log(id);
    fetchPosts(id);
    fetchComments(id);
    console.log(blog);
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    console.log(`file ${{ file }}`);
    const fileFormData = new FormData();
    fileFormData.append("blogPostCover", file);
    console.log(fileFormData);
    const uploadCover = async (id) => {
      try {
        let response = await fetch(
          `http://localhost:3001/blogs/${id}/uploadCover`,
          {
            method: "PUT",
            body: fileFormData,
          }
        );
        fetchPosts(id)
      } catch (error) {
        console.log(error);
      }
    };
    uploadCover(id);
    console.log("postPhoto");
    setOpen(false);
  }
  return (
    <div className="blog-details-root">
      <Container>
        <Row>
          <Col className="col-9">
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            <Button
              onClick={() => setOpen(true)}
              size="lg"
              variant="dark"
              style={{ margin: "1em" }}
            >
              {" "}
              Upload Cover
            </Button>
          </Col>
          <Col className="col-3">
            <div className="mt-5">
              <Card body>
                <h4>Comments</h4>
              </Card>
              {comments.map((comment) => (
                <Card body key={comment.userName}>
                  <h5>{comment.userName}</h5> {comment.text}
                </Card>
              ))}
              <Form>
                <Form.Group>
                  <Form.Label>Leave a comment</Form.Label>
                  <textarea
                    name="text"
                    id="text"
                    cols="auto"
                    rows="2"
                  ></textarea>
                  <Form.Control
                    size="auto"
                    placeholder="Title"
                    onChange={(e) => setNewComment({ title: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={open}
          animation={false}
        >
          <Modal.Header>
            <Modal.Title>Upload Cover</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitForm}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Choose</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    const file = e.target.files[0];
                    console.log(`Number 1 ${e.target}`);
                    console.log(e.target.files);
                    console.log(file);
                    setFile(file);
                  }}
                  accept="image/*"
                  type="file"
                  placeholder="Photo"
                  required
                />
              </Form.Group>
              <Form.Group className="d-flex mt-3">
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
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  )
}

export default withRouter(Blog)