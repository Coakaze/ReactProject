import { Container, Row } from "react-bootstrap";
import MenuItem from "./MenuItem";
import { useEffect, useState } from "react";
import app from "../../firebase";

const MenuContent = () => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        const fetchMenu = async () => {
            const response = await fetch(app.options.databaseURL + '/menu.json');
            const responseJSON = await response.json();

            let menuList = [];
            for (let key in responseJSON) {
                menuList.push({
                    id: key,
                    title: responseJSON[key].title,
                    text: responseJSON[key].text,
                    price: responseJSON[key].price
                });
            }
            setMenu(menuList);
        };
        fetchMenu();
    }, []);

    const menuList = menu.map(meal => <MenuItem key={meal.id} mealDesc={meal}></MenuItem>);
    return (
        <Container>
            <Row xs={1} md={2}>
                {menuList}
            </Row>
        </Container>

    );
}

export default MenuContent;