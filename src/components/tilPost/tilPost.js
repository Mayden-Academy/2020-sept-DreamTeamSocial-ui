import React, {Component} from 'react';
import './tilPost.css';
import MetaTags from 'react-meta-tags';
import Button from "../button";


export class TilPost extends Component {

    constructor(props) {
        super(props);
        this.state = {copied: false,
        timeout: true};
    }

    handleClick = async (event) => {
        event.preventDefault()
        if(navigator.share) {
            navigator.share({
                title: "TILTime Social Media App",
                url: "http://localhost:3000/profile/" + this.props.posterName + "/" + this.props.id,
                text: this.props.tilPost
            }).then(() => {
                console.log('Shared')
            })
        } else {
            this.setState({timeout: true})
            await this.updateClipboard("http://localhost:3000/profile/" + this.props.posterName + "/" + this.props.id)
            console.log(this.props)
            setTimeout(() => {
                this.setState({copied: false})
            }, 5000)
        }
    }

    updateClipboard = async (text) => {
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
            if (result.state == "granted" || result.state == "prompt") {
                console.log('inside permission granted')
                navigator.clipboard.writeText(text).then(() => {
                    console.log('inside if')
                    this.setState({copied: true})
                }, () => {
                    this.setState({copied: false})
                });
            }
        });
    }

    notifyCopied() {
        if (this.state.copied){
            return <p className="copy_message">Link copied to clipboard!</p>
        }
    }


    render() {
        return (
            <>
                <div className="wrapper">
                    <MetaTags>
                        <title>TILTime</title>
                        <meta name="description" content={this.props.tilPost} />
                        <meta property="og:url" content={"http://localhost:3000/profile/" + this.props.posterName + "/" + this.props.id}/>
                        <meta property="og:title" content="TILTime Learning App" />
                        <meta property="og:image" content="http://localhost:3000/icon-192X192.png" />
                        <meta name="twitter:url" content={"http://localhost:3000/profile/" + this.props.posterName + "/" + this.props.id}/>
                        <meta name="twitter:title" content="TILTime Learning App" />
                        <meta name="twitter:description" content={this.props.tilPost} />
                        <meta name="twitter:image" content="http://localhost:3000/icon-192X192.png" />
                    </MetaTags>
                </div>
                <div key={this.props.i} id={this.props._id} className="til_form">
                    <div className="flex_til_titles">
                        <p>Posted by: {this.props.posterName} </p>
                        <p>Posted: {this.props.formatDate(this.props.createdAt)}</p>
                        <Button className="share_button" click={this.handleClick} name="Share"/>
                    </div>
                    <div className="til_post_content">
                        <p>{this.props.tilPost}</p>
                        {this.notifyCopied()}
                    </div>
                </div>
                </>
        )
    }
}
