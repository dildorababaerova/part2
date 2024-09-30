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

