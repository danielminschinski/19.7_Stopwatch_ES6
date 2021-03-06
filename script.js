class Stopwatch extends React.Component {
    constructor(){
        super();
        this.state = {
            running: false,
            minutes: 0,
            seconds: 0,
            miliseconds: 0
            }       
        }
    
    reset(){
        this.setState({
            minutes: 0,
            seconds: 0,
            miliseconds: 0    
        });
    }

    pad0(value){
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        } 
        return result;
    }

    format(times){
        return `${this.pad0(times.minutes)}:
                ${this.pad0(times.seconds)}:
                ${this.pad0(Math.floor(times.miliseconds))}`;
    }

    start(){
        if (!this.state.running) {
            this.state.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step(){
        if (!this.state.running) return;
        this.calculate();
    }

    calculate() {
    let miliseconds = this.state.miliseconds + 1,
      seconds = this.state.seconds,
      minutes = this.state.minutes;
    if (miliseconds >= 100) {
      seconds += 1;
      miliseconds = 0;
    }
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
      miliseconds = 0;
    }
    this.setState({
      minutes,
      seconds,
      miliseconds
    });
  };

    stop(){
        this.setState({
            running: false
        });
        clearInterval(this.watch);
    }

    render(){
       return (
           <div>
               <nav>
                    <button className={'start'} onClick={() => {this.start() }}>Start</button>
                    <button className={'stop'} onClick={() => {this.stop() }}>Stop</button>
                    <button className={'reset'} onClick={() => {this.reset() }}>Reset</button>
               </nav>
               <div className={'stopwatch'}>
                    {this.format({
                        minutes: this.state.minutes,
                        seconds: this.state.seconds,
                        miliseconds: this.state.miliseconds
                    })}
                </div>
           </div>
       )
    }
}

const app = React.createElement(Stopwatch);
ReactDOM.render(app, document.getElementById('app'))