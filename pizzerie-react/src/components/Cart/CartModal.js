import React, { useState, useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useAuth } from '../../store/auth-context';
import { CartContext } from '../../store/cart-context';
import app from '../../firebase';

const CartModal = () => {
    const globalState = useContext(CartContext);
    const [show, setShow] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let { user } = useAuth();
    const submitOrder = () => {
        fetch(app.options.databaseURL + '/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                userEmail: user.email,
                address: address,
                phoneNumber: phoneNumber,
                orderData: globalState.items,
                amount: globalState.amount
            })
        })
        globalState.deleteCart();
        console.log(address, phoneNumber);
        handleClose();

    }

    return (
        <>
            <div className="text-center mt-5">
                <Button variant="warning" onClick={handleShow}>
                    Place your order!
                </Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter your phone number and address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="phone number"
                                onChange={handlePhoneNumberChange}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                onChange={handleAddressChange}
                                type="text"
                                placeholder="address"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitOrder}>
                        Place Order
                    </Button>
                </Modal.Footer>
            </Modal>
        </>


    );
}

export default CartModal;