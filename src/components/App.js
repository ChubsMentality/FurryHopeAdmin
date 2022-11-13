import React from 'react'

// Pages
import Login from './Login'
import AddData from './AddData'
import AddAdmin from './AddAdmin'
import AccountsList from './AccountsList'
import ManageData from './ManageData'
import UpdateData from './UpdateData'
import AnimalRegistration from './AnimalRegistration'
import AdoptionApplications from './AdoptionApplications'
import Adoptions from './Adoptions'
import Adoption from './Adoption'
import StrayAnimalReports from './StrayAnimalReports'
import Donations from './Donations'
import SpecDonation from './SpecDonation'
import Error from '../components/Error404'
import UserFeedback from './UserFeedback'
import SpecRegistration from './SpecRegistration'

import '../css/App.css'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

/*
 To be added
 1. Form handling (error handling, null values on form fields, etc.)
 2. adoption (from the mobile app)
*/

const App = () => {
    return (
        <div className="body-app">  
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/accountsList" component={AccountsList} />
                    <Route path="/manage" component={ManageData} />
                    <Route path="/add" component={AddData} />
                    <Route path="/addAdmin" component={AddAdmin} />
                    <Route path="/animalRegistration" component={AnimalRegistration} />
                    <Route path='/specReg/:id' component={SpecRegistration} />
                    {/* <Route path="/adoptions" component={AdoptionApplications} /> */}
                    <Route path="/adoptions" component={Adoptions} />
                    <Route path="/adoption/:id" component={Adoption} />
                    <Route path="/update/:id" component={UpdateData} />
                    <Route path="/reports" component={StrayAnimalReports} />
                    <Route path="/donations" component={Donations} />
                    <Route path='/donation/:id' component={SpecDonation} />
                    <Route path='/feedbacks' component={UserFeedback} />
                    <Route path="*" component={Error} />
                </Switch>  
            </Router>
        </div>
    )
}

export default App
