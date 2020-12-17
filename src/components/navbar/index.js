import React, {Component} from 'react';
import {Link} from "../link";
import './index.css';
import { CgProfile } from 'react-icons/cg';
import { CgFeed } from 'react-icons/cg';
import { CgLogOut } from 'react-icons/cg';


export class NavBar extends Component {
    render() {
        return (
            <nav className="navigation">
                <Link link={`/profile/${this.props.currentUser}`} name=<CgProfile /> />
                <Link link="/timeline" name=<CgFeed /> />
                <div className="logout">
                    <Link link="/logout" name=<CgLogOut /> />
                </div>
            </nav>
        )
    }
}