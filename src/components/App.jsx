import React from 'react';
import Header from './Header';
import NewTicketControl from './NewTicketControl';
import TicketList from './TicketList';
import { Switch, Route } from 'react-router-dom';
import Error404 from './Error404';
import Admin from './Admin';
import { v4 } from 'uuid';
// import Moment from 'moment';
import NewHighScoreForm from './NewHighScoreForm';
import HighScoreList from './HighScoreList';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      masterTicketList: {},
      selectedTicket: null,
      masterHighScoreList: []
    };
    this.handleAddingNewTicketToList = this.handleAddingNewTicketToList.bind(this);
    this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(this);


    this.handleAddingNewHighScoreToList = this.handleAddingNewHighScoreToList.bind(this);
  }

  handleAddingNewHighScoreToList(newHighScore) {
    let newHighScoreList = this.state.masterHighScoreList.slice();
    newHighScoreList.push(newHighScore);
    this.setState({masterHighScoreList: newHighScoreList});
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }

  handleChangingSelectedTicket(ticketId) {
    this.setState({selectedTicket: ticketId});
  }


  handleAddingNewTicketToList(newTicket){
    let newTicketId = v4();
    let newMasterTicketList = Object.assign({}, this.state.masterTicketList, {
      [newTicketId]: newTicket
    });
    newMasterTicketList[newTicketId].formattedWaitTime = newMasterTicketList[newTicketId].timeOpen.fromNow(true);
    this.setState({masterTicketList: newMasterTicketList});
  }


  updateTicketElapsedWaitTime() {
    let newMasterTicketList = Object.assign({}, this.state.masterTicketList);
    Object.keys(newMasterTicketList).forEach(ticketId => {
      newMasterTicketList[ticketId].formattedWaitTime = (newMasterTicketList[ticketId].timeOpen).fromNow(true);
  });
  this.setState({masterTicketList: newMasterTicketList});
  }


  render(){
    console.log(this.state.masterHighScoreList);
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' render={()=><TicketList ticketList={this.state.masterTicketList} />} />
          <Route path='/newticket' render={()=><NewTicketControl onNewTicketCreation={this.handleAddingNewTicketToList} />} />
          <Route path='/admin' render={(props) => <Admin ticketList={this.state.masterTicketList}  currentRouterPath={props.location.pathname} onTicketSelection={this.handleChangingSelectedTicket}
            selectedTicket={this.state.selectedTicket}/>} />


          <Route path= '/newhighscore' render={()=><NewHighScoreForm onNewHighScoreCreation={this.handleAddingNewHighScoreToList}/>} />
          <Route path= '/highscore' render={()=><HighScoreList highScoreList={this.state.masterHighScoreList} />} />

          <Route component={Error404} />



        </Switch>
      </div>
    );
  }
}

export default App;
