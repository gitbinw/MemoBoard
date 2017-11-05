import React from 'react';
import Utility from '../../lib/Utility.js';
import Idea from '../idea/Idea';
import SortOptions from './SortOptions';

export default class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ideas: [],
            loading: false,
            sortBy: '',
            message: ''
        }

        this.addNewIdea = this.addNewIdea.bind(this);
        this.deleteIdea = this.deleteIdea.bind(this);
        this.updateIdea = this.updateIdea.bind(this);
        this.sortIdea = this.sortIdea.bind(this);
    }

    addNewIdea() {
        Utility.addNewIdea((newIdea) => {
            const arrIdeas = this.state.ideas.slice();
            arrIdeas.push(newIdea);
            this.setState({
                ideas: arrIdeas
            })
        });
    }
    updateIdea(idea) {
        Utility.updateIdea(idea, (updIdea) => {
            const arrIdeas = this.state.ideas.slice();
            arrIdeas.forEach((val, index) => {
                if (val.id === updIdea.id) {
                    arrIdeas[index] = Object.assign(val, updIdea);
                }
            });
            this.setState({
                ideas: arrIdeas,
                message: "The changes are successfully saved."
            }, () => {
                setTimeout(() => {
                    this.setState({message: ''});
                }, 3000);
            });
        });
    }
    deleteIdea(ideaId) {
        Utility.deleteIdea(ideaId, (delIdea) => {
            const arrIdeas = this.state.ideas.slice();
            arrIdeas.filter((val, index) => {
                if (val.id === delIdea.id) {
                    arrIdeas.splice(index, 1);
                }
            });
            this.setState({
                ideas: arrIdeas
            });
        });
    }

    sortIdea(e) {
        const sortBy = e.target.value;

        let arrIdeas = this.state.ideas.slice();
        
        Utility.sortData(arrIdeas, sortBy);

        this.setState({ideas: arrIdeas});
    }

    componentDidMount() {
        let ideas = [];
        const cachedIdeas = localStorage.getItem('memoIdeas');
        if (cachedIdeas) {
            ideas = JSON.parse(cachedIdeas);
            this.setState({ideas: ideas});
        } 
        if (ideas.length <= 0) {
            this.setState({loading: true});
            Utility.getIdeas((jData) => {
                this.setState({ideas: jData, loading: false});
            });
        } 
    }
    componentWillUnmount() {
        this.setState({
            ideas: [],
            loading: false,
            sortBy: ''
        })
        localStorage.clear();
    }
    componentDidUpdate() {
        localStorage.setItem('memoIdeas', JSON.stringify(this.state.ideas));
       
    }
    render() {
        const jsxIdeas = this.state.ideas.map((idea, i) => {
            return (
                <Idea key={idea.id} 
                    onDelete={this.deleteIdea}
                    onUpdate={this.updateIdea}
                    {...idea}
                ></Idea>
            );
        });

        const listClassName = this.state.loading ? 'idea-list list-loading' : 'idea-list';

        return (
            <div className="memo-board">
                <div className="memo-header">
                    <SortOptions onSort={this.sortIdea} />
                    <button onClick={this.addNewIdea}>Add&#x2795;</button>
                    <span className="board-message">{this.state.message}</span>
                </div>

                <div className={listClassName}>
                    {jsxIdeas}
                </div>
            </div>
        );
    }
}