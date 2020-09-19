import {html, Component, render} from 'https://unpkg.com/htm/preact/standalone.module.js';
import {io} from 'https://unpkg.com/socket.io-client@2.3.0/dist/socket.io.js';


const socket = io('http://localhost:3000');

class App extends Component {

  componentDidMount() {
    socket.on('connect', function() {
      const room = 'Hola';
      const username = 'Kulili';

      socket.emit('joinGame', {
        room,
        username,
      });

      socket.on('updateRoomCount', (userCount) => {
        console.log(userCount);
      });
    });
  }

  render() {
    return html`<h1>This is the frontend</h1>`;
  }
}

render(html`<${App} />`, document.body);
