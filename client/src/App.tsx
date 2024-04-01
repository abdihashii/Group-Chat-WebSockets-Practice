import { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatRoom from './components/ChatRoom';
import Home from './components/Home';

export const CurrentUserContext = createContext<{
	currentUser: string | null;
	setCurrentUser: React.Dispatch<React.SetStateAction<string | null>>;
}>({ currentUser: null, setCurrentUser: () => null });

function App() {
	const [currentUser, setCurrentUser] = useState<string | null>(null);

	return (
		<CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/:groupChatId" element={<ChatRoom />} />
				</Routes>
			</Router>
		</CurrentUserContext.Provider>
	);
}

export default App;
