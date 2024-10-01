# part2
Full stack open part2

Snippet
* `clog`
* `ES7+ React/Redux/React-Native snippets`

- `
You can search through snippets with ES7 snippet search command which can be run with CMD + Shift + P or just use CMD + Shift + R (CTRL + ALT + R for Windows & Linux) keybinding.
`
`* Create Vite: 
- `npm create vite@latest part1 --template react`
- `npm install`

- In terminal app commands
`
cd part2
npm install
npm run dev
`



 * <b>reduse</b>
 `
var orders= [
    {amount: 250},
    {amount: 200},
    {amount: 300},
    {amount: 78},
    {amount: 23}
]

with for lopp 

var totalAmount=0
for (i=0 i< orders.length i++)
    totalAmount+=orders[i].amount

with reduse
var totalAmount = orders.reduse=>((sum, order) {
    sum+order.amount
} , 0)

were is 0 starting point for sum 

* <b>rfc</b> – создаёт функциональный компонент:

` javascript

import React from 'react';

const MyComponent = () => {
    return <div></div>;
};

export default MyComponent;

* <b>rafce – </b> создаёт функциональный компонент с экспортом по умолчанию:

`
import React from 'react';

const MyComponent = () => {
    return <div></div>;
};
`

export default MyComponent;
`

rcc – создаёт классовый компонент:
`
javascript

import React, { Component } from 'react';

class MyComponent extends Component {
    render() {
        return <div></div>;
    }
}
export default MyComponent;
`


redux – создаёт файлы для Redux (действие, редьюсер и константы):
`
    Сниппет для экшенов: reduxaction.
    Для редьюсера: reduxreducer.
    Для подключения Redux к компоненту: reduxmap для mapStateToProps и mapDispatchToProps.
`

* Полезные команды:

    imr – импорт React.
    impt – импорт PropTypes.
    conn – подключение компонента к Redux.


    * Unique id:

    import { v4 as uuidv4 } from 'uuid';

    const noteObject = {
    content: newNote,
    important: Math.random() > 0.5,
    id: uuidv4() // Генерирует уникальный идентификатор
    };


    * part 3c
    - Crete a file named db.json in the root in `part2` folder
    - From the root directory of your app, we can run the json-server using the command npx:
    - `npx json-server --port 3001 --watch db.json`

    * Create `axios` library for to pull data fron the server. npm-commands should always be run in the project root directory, which is where the package.json file can be found => part2. 
    - Run command `npm install axios`
    
    - Install json-server as a development dependency (only used during development) by executing the command: 
    - Run `npm install json-server --save-dev`
    : Add package.json=>"scripts"=> "server": "json-server -p3001 --watch db.json"

    `
    {
  // ... 
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",

    "server": "json-server -p3001 --watch db.json"
  },
}
    `

    We can now conveniently,  start the json-server from the project root directory with the command:

    - `npm run server`

    NB: To run json-server and your react app simultaneously, you may need to use two terminal windows. One to keep json-server running and the other to run our React application.

    Add the following to the file App.jsx:

    `
    import axios from 'axios'

    const hook = () => {
    console.log('effect')
    axios
        .get('http://localhost:3001/notes')
        .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
    })
    }

    useEffect(hook, [])
    `

    The second parameter of useEffect is used to specify how often the effect is run. If the second parameter is an empty array [], then the effect is only run along with the first render of the component.




