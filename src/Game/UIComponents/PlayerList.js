import React from "react";
import PlayerType from "../PlayerType";

class PlayerList extends React.Component
{
    constructor(props)
    {
        super();
    }

    render()
    {
        return (
            <div className='player-list'>
                <div>
                    <h3>Players</h3>
                    <ul>
                        { this.props.players.map((player, key) => player.type === PlayerType.PLAYER && <li key={key}>{player.name}</li>)  }
                    </ul>
                </div>
                {this.props.players.length > 2 &&
                <div>
                    <h3>Spectators</h3>
                    <ul>
                    { this.props.players.map((player, key) => player.type === PlayerType.SPECTATOR && <li key={key}>{player.name}</li>)  }
                    </ul>
                </div>}
            </div>
        );
    }
}

export default PlayerList;