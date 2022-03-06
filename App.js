import {createStackNavigator} from "@react-navigation/stack"
import {StyleSheet} from "react-native-web"
import HomePage from "./screens/HomePage.js"
import {NavigationContainer} from "@react-navigation/native"

const Stack = createStackNavigator()

function MyStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomePage} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
})

export default MyStack
