import { h, render, Component} from 'preact';
import io from 'socket.io-client';


class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://127.0.0.1:3000');
    this.state = {
      connectedUsers: []
    };
  }

  componentDidMount() {
    this.socket.on('connect', () => {
      const room = 'Hola';
      const username = 'Kulili';
      
      console.log(room);

      this.socket.emit('joinRoom', {
        room,
        username,
      });

    });

    this.socket.on('updateRoomCount', (userCount) => {
      this.setState({connectedUsers: userCount});
    });
  }

  render() {
    return (
      <div>
        <h1>Active participants</h1>
        {this.state.connectedUsers.map(function(name, index){
            return <li key={ index }>{name}</li>;
        })}
      </div>
    );
  }
}

render(<App />, document.body);
