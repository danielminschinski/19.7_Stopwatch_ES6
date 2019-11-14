class Stopwatch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            running: false,
            display: '',
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }       
        }
    }

    reset(){
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }

    resetTimer(){
        this.reset();
        this.print();
    }

    print(){
        this.setState({
            display: this.format(this.state.times)
        });
    }


    format(times){
        return `${this.pad0(this.state.times.minutes)}:
            ${this.pad0(this.state.times.seconds)}:
            ${this.pad0(Math.floor(this.state.times.miliseconds))}`;
    }

    pad0(value){
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        } 
        return result;
    }

    start(){
        if (!this.state.running) {
            this.setState({
                running: true
            });
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step(){
        if (!this.state.running) return;
        this.calculate();
        this.print();
    }

    calculate(){
        this.setState({
            times: {
                minutes: this.state.times.minutes,
                seconds: this.state.times.seconds,
                miliseconds: (this.state.times.miliseconds += 1)
            }
        });

        if (this.state.times.miliseconds >= 100){
            this.setState({
                times: {
                    minutes: this.state.times.minutes,
                    seconds: (this.state.times.seconds += 1),
                    miliseconds: 0
                }
            });
        }

        if (this.state.times.seconds >= 60){
            this.setState({
                times: {
                    minutes: (this.state.minutes += 1),
                    seconds: 0,
                    miliseconds: this.state.times.miliseconds
                }
            });
        }
    }

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
                    <button className='start' onClick={this.start.bind(this)}>Start</button>
                    <button className='stop' onClick={this.stop.bind(this)}>Stop</button>
                    <button className='reset' onClick={this.resetTimer.bind(this)}>Reset</button>
               </nav>
               <div className='stopwatch'>{this.state.display}</div>
           </div>
       )
    }
}




ReactDOM.render(<Stopwatch />, document.getElementById('app'));