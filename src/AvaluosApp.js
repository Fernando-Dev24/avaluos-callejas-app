import React, { useState, useEffect } from 'react';
import WebFont from 'webfontloader';
/* helpers */
import { Routes, Route } from 'react-router-dom';
/* components */
import { Login } from './components/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { Feed } from './components/Feed';
import { Waiting } from './components/Waiting';
import { General } from './components/General';
import { Aesthethic } from './components/Aesthethic';
import { Mechanic } from './components/Mechanic';
import { CarValue } from './components/CarValue';
import { FileUploader } from './components/FileUploader';
import { Avaluo } from './components/Avaluo';
import { CreateUser } from './components/CreateUser';
import { RecoverPassword } from './components/RecoverPassword';
/* elements */
import { Alert } from './styled-components/Alert';
/* version */
import appInfo from '../package.json';

export const AvaluosApp = () => {
	/* states */
	const [showModal, setShowModal] = useState(false);
	const [targetAvaluo, setTargetAvaluo] = useState({
		isSomething: false,
		content: {}
	});
	const [alertState, setAlertState] = useState(false);
	const [alertContent, setAlertContent] = useState({});
	const [editAvaluo, setEditAvaluo] = useState(false);

	WebFont.load({
		google: {
			families: ['Outfit:300,400,500,600'],
		},
	});

	useEffect(() => {
		console.log(appInfo.version);
	}, []);

  	return (
		<>
			<main>
			<Routes>
				<Route path='/login' element={ <Login /> } />
				<Route
					path='/recover-password'
					element={
					<RecoverPassword
						setAlertState={ setAlertState }
						setAlertContent={ setAlertContent }
					/>
					}
				/>
				<Route element={ <PrivateRoute /> }>
					<Route
					path='/'
					element={
						<Feed
							setTargetAvaluo={ setTargetAvaluo }
							setAlertState={ setAlertState }
							setAlertContent={ setAlertContent }
						/>
					}
					/>
					<Route
					path='/waiting'
					element={
						<Waiting
							setTargetAvaluo={ setTargetAvaluo }
						/>
					}
					/>
					<Route
					path='/new/general'
					element={
						<General
							showModal={ showModal }
							setShowModal={ setShowModal }
							alertState={ alertState }
							alertContent={ alertContent }
							setAlertState={ setAlertState }
							setAlertContent={ setAlertContent }
							editAvaluo={ editAvaluo }
							setEditAvaluo={ setEditAvaluo }
						/>
					}
					/>
					<Route
					path='/new/aesthethic'
					element={
						<Aesthethic
							showModal={ showModal }
							setShowModal={ setShowModal }
							alertState={ alertState }
							alertContent={ alertContent }
							setAlertState={ setAlertState }
							setAlertContent={ setAlertContent }
							editAvaluo={ editAvaluo }
							setEditAvaluo={ setEditAvaluo }
						/>
					} />
				</Route>
				<Route
					path='/new/mechanic'
					element={
					<Mechanic
						showModal={ showModal }
						setShowModal={ setShowModal }
						alertState={ alertState }
						alertContent={ alertContent }
						setAlertState={ setAlertState }
						setAlertContent={ setAlertContent }
						editAvaluo={ editAvaluo }
						setEditAvaluo={ setEditAvaluo }
					/>
					}
				/>
				<Route
					path='/new/car-value'
					element={
					<CarValue
						showModal={ showModal }
						setShowModal={ setShowModal }
						alertState={ alertState }
						alertContent={ alertContent }
						setAlertState={ setAlertState }
						setAlertContent={ setAlertContent }
						editAvaluo={ editAvaluo }
						setEditAvaluo={ setEditAvaluo }
					/>
					}
				/>
				<Route
					path='/new/files'
					element={
					<FileUploader
						showModal={ showModal }
						setShowModal={ setShowModal }
						alertState={ alertState }
						alertContent={ alertContent }
						setAlertState={ setAlertState }
						setAlertContent={ setAlertContent }
						editAvaluo={ editAvaluo }
						setEditAvaluo={ setEditAvaluo }
					/>
					}
				/>
				<Route
					path='/avaluo/:id'
					element={
					<Avaluo
						targetAvaluo={ targetAvaluo }
						setTargetAvaluo={ setTargetAvaluo }
						setAlertContent={ setAlertContent }
						setAlertState={ setAlertState }
						alertState={ alertState }
						alertContent={ alertContent }
						setEditAvaluo={ setEditAvaluo }
					/>
					}
				/>
				<Route
					path='/create-user'
					element={
					<CreateUser
						alertState={ alertState }
						alertContent={ alertContent }
						setAlertState={ setAlertState }
						setAlertContent={ setAlertContent }
					/>
					}
				/>
			</Routes>

			<Alert
					type={alertContent.type}
					message={alertContent.message}
					alertState={alertState}
					setAlertState={setAlertState}
				/>
			</main>
		</>
  	);
};