import React from 'react'
import Footer from './Footer'
import ConditionalNav from './ConditionalNav'
import Home from './notes/Home'
import FoldersPage from './notes/FoldersPage'
import NotesPage from './notes/NotesPage'
import CreateNote from './notes/CreateNote'
import EditNote from './notes/EditNote'
import SignIn from './signIn'
import SignUp from './SignUp'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

export default function Notes() {
    return (
        <Router>
            <ConditionalNav/>
                <Routes>
                    <Route path = "/" element={<Home/>} exact />
                    <Route path = "/login" element={<SignIn/>} exact/>
                    <Route path = "/register" element={<SignUp/>} exact/>
                    <Route path = "/notes" element = {<FoldersPage/>} exact />
                    <Route path = "/dirnotes/:directory" element = {<NotesPage/>} exact />
                    <Route path = "/create" element = {<CreateNote/>} exact />
                    <Route path = "/edit/:id" element = {<EditNote/>} exact />
                </Routes>
            <Footer className='footer'/>
        </Router>
    )
}