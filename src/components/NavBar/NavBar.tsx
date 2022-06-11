import React,{ useState } from "react";
import Logo from '../Navigation/Logo';
import MenuLinks from "../Navigation/MenuLinks";
import MenuToggle from "../Navigation/MenuToggle";
import NavBarContainer from "../Navigation/NavBarContainer";
import ToggleLayout from "../Navigation/ToggleLayout";

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    return (
        <NavBarContainer {...props}>
            <Logo w="100px" />
            <MenuLinks isOpen={isOpen} />
            <ToggleLayout />
            <MenuToggle toggle={toggle} isOpen />
        </NavBarContainer>
    )
}

export default NavBar
