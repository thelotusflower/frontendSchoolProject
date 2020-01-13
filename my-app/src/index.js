import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter from 'react-dom';
import './index.css';

var { Router, Route, IndexRoute, Link, browserHistory } = ReactRouter

class MainLayout extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        categoryName: '',
      }
    }

 setCategoryName = (event) => {
   console.log(this.props.route.routesList.length);
    this.setState({
      categoryName: event.target.value,
    });
  }

  render() {
    return (
      <div className="app">
         <div className="wrapper">
            <aside class="layout_header">
                <img src="https://image.flaticon.com/icons/png/512/1946/1946355.png" width="25"/>
             </aside>

          <main class="layout_footer">
            {this.props.children}
          </main>
           <menu class="layout_header">
            <input type="text" value={this.state.value} onChange={this.setCategoryName} placeholder="Введите имя категории..." />
            <button onClick = {this.props.route.addNewCategory(this.state.categoryName)}>Создать новую категорию</button>
            <div className="section">
              <div className="section_block section_block--header">
                <h3 class="section_title">Категории:</h3>
              </div>
              <ul>
                <li>
                  <Link to='/' className="nav_item">#Home</Link>
                </li>

                { this.props.route.routesList.map(function(route) {
                  return <li>
                    <Link to={route.path} className="nav_item">#{route.name}</Link>
                  </li>
                }) }
              </ul>
            </div>
            <div className="section">
              <div className="section_block section_block--header">
                <h3 class="section_title">О приложении</h3>
              </div>
              <div className="section_block section_block--content">
                <p>Сервис для построения рейтингов постов из VK</p>
                <p>Наш сервис позволяет задать интересующий набор сообществ, по которым нужно отбирать наиболее интересные посты за определенное время.</p>
              </div>
             </div>
          </menu>
        </div>
      </div>
      )
  }
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1 className="feed_header">Home Page</h1>
        <p className="feed_body">Выберете категорию</p>
      </div>
    )
  }
}

class SearchLayout extends React.Component {
  render() {
    return (
      <div className="search">
        <header className="search-header"></header>
        <div className="results">
          {this.props.children}
        </div>
        <div className="search-footer pagination"></div>
      </div>
      )
  }
}

class Posts  extends React.Component {
  render() {
    return (
      <div>
        <h1 className="feed_header">Топ посты</h1>
        <div className="feed_item">
          <div className="feed_img">
            <img src="https://i1.sndcdn.com/avatars-000154620368-s64hq8-t500x500.jpg" width="125"/>
          </div>
          <div className="feed_body">
            <div className="feed_autor">
              MDK
            </div>
            <div className="feed_text">
              And that's not a joke, we really do.
            </div>
            <div className="feed_likes">
              <img src="https://i.pinimg.com/originals/00/da/4a/00da4ad5acf86d5f802038c527dbf635.png" width="25"/><span className="feed_amount">24</span>
              <img src="https://image.flaticon.com/icons/svg/1999/1999353.svg" width="25"/><span className="feed_amount">40</span>
            </div>
          </div>
        </div>
       </div>
      )
  }
}

class Root extends React.Component {
      constructor(props) {
      super(props);
      this.state = {
        routesList: [
           {name:'Коты', path: 'post1', component: Posts},
           {name:'Мемы', path: 'post1', component: Posts},
         ]
      }
    }

  addNewCategory = (value) => {
    this.state.routesList.push({name: value, path: 'Qs' + (+new Date()), component: Posts})
  }

  render() {
    return (<React.Fragment>
                <Router>
                  <Route path="/" component={MainLayout} addNewCategory={this.addNewCategory} routesList={this.state.routesList} />
                  <IndexRoute component={Home} />
                  <Route component={SearchLayout}>
                  <Route path="post1" component={Posts}  routesList={this.state.routesList}/>
                    // { this.state.routesList.map(function(route) {
                    //   console.log(route.path);
                    //       return <Route path={route.path} component={Posts}/>
                    // }) }

                </Router>
            </React.Fragment>
    )
}

ReactDOM.render((
  <Root />
), document.getElementById('root'))


// ========================================

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
