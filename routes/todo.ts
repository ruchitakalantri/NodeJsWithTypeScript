import {Router} from 'express';

import { Todo } from '../models/todo';

//type-alias
type RequestBody = {text : string};

type RequestParams = {todoId : string};

let todos: Todo[]  = [];

const router = Router();

router.get('/' , (req , res , next) => {
    res.status(200).json({todos : todos});
});

router.post('/todo' , (req , res , next) => {
    const body = req.body as RequestBody;
    const newTodo : Todo = {
        id : new Date().toISOString(),
        text : body.text
    };
    todos.push(newTodo);
    res.status(201).json({message : 'Added TODO' , todo : newTodo , todos : todos});
});

router.put('/todo/:todoId' , (req , res , next) => {
    const params = req.params as RequestParams;
    const tid = params.todoId;
    const body = req.body as RequestBody;

    // find index of some element
    // want to return true if todoItem.id === tid
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid );
    if(todoIndex >= 0) {
        //valid index
        todos[todoIndex] = { id : todos[todoIndex].id , text : body.text} ;
        return res.status(200).json({message : 'updated todo ' , todos : todos});
    }
    //invalid index
    res.status(404).json({message : 'Could not find todo for this id '});
});

router.delete('/todo/:todoId' , (req , res , next) => {
    const params = req.params as RequestParams;
    //get rid of one todo
    todos = todos.filter(todoItem => todoItem.id !== params.todoId);
    res.status(200).json({message : 'Deleted TODO' , todos : todos});
});


export default router;