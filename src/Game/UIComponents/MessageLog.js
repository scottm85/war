import React from "react";

class MessageLog extends React.Component
{
    constructor(props)
    {
        super();
    }



    render()
    {
        return (
            <div className='col-12 mt-3 card py-3'>
                {this.props.messages.map((message, key) => <div className='message' key={key}>{message}</div>)}
            </div>
        );
    }

}

export default MessageLog;