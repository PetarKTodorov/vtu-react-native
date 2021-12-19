import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/login';
import Register from '../screens/register';
import MyGames from '../screens/my-games';
import CreateGame from '../screens/create-game';
import PlayGame from '../screens/play-game';

import screens from '../../constants/screens';

const Stack = createStackNavigator();

function Application(props) {
  const [userId, setUserId] = useState(null);
  const [currentGameId, setCurrentGameId] = useState(null);

  const screenList = userId ? (
    <>
      <Stack.Screen name={screens.myGames} options={{ header: () => null }}>
        {props => <MyGames
          {...props}
          userId={userId}
          setUserId={setUserId}
          currentGameId={currentGameId}
          setCurrentGameId={setCurrentGameId}
        />}
      </Stack.Screen>
      <Stack.Screen name={screens.createGame} options={{ header: () => null }}>
        {props => <CreateGame
          {...props} 
          userId={userId}
          setUserId={setUserId}
        />}
      </Stack.Screen>
      <Stack.Screen name={screens.playGame} options={{ header: () => null }}>
        {props => <PlayGame
          {...props}
          userId={userId}
          setUserId={setUserId}
          currentGameId={currentGameId}
        />}
      </Stack.Screen>
    </>
  ) : (
    <>
      <Stack.Screen name={screens.login} options={{ header: () => null }}>
        {props => <Login {...props} setUserId={setUserId} />}
      </Stack.Screen>
      <Stack.Screen name={screens.register} options={{ header: () => null }}>
        {props => <Register {...props} />}
      </Stack.Screen>
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {screenList}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Application;

