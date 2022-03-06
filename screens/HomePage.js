import React, {useRef} from "react"
import categoriesData from "../testData"
import {VictoryPie} from "victory-native"

import {Svg} from "react-native-svg"
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	Image,
	ImageBackground,
	TouchableOpacity,
	FlatList,
	Animated,
	Platform,
} from "react-native"

import {COLORS, FONTS, SIZES} from "../constants/theme"
import icons from "../constants/icons"
export default function HomePage() {
	const [viewMode, setViewMode] = React.useState("chart")

	const categoryListHeightAnimationValue = useRef(
		new Animated.Value(115)
	).current

	const [categories, setCategories] = React.useState(categoriesData)
	const [selectedCategory, setSelectedCategory] = React.useState(null)
	const [showMoreToggle, setShowMoreToggle] = React.useState(false)
	function renderNavBar() {
		return (
			<View
				style={{
					flexDirection: "row",
					height: 80,
					justifyContent: "space-between",
					alignItems: "flex-end",
					paddingHorizontal: SIZES.padding,
					backgroundColor: COLORS.white,
				}}
			>
				<TouchableOpacity
					onPress={() => {
						console.log("Back")
					}}
					style={{
						justifyContent: "center",
						width: 50,
					}}
				>
					<Image
						source={icons.back_arrow}
						style={{
							width: 30,
							height: 30,
							tintColor: COLORS.primary,
						}}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						console.log("More")
					}}
					style={{
						justifyContent: "center",
						alignItems: "flex-end",
						width: 50,
					}}
				>
					<Image
						source={icons.more}
						style={{
							width: 30,
							height: 30,
							tintColor: COLORS.primary,
						}}
					/>
				</TouchableOpacity>
			</View>
		)
	}

	function renderHeader() {
		return (
			<View
				style={{
					paddingHorizontal: SIZES.padding,
					paddingVertical: SIZES.padding,
					backgroundColor: COLORS.white,
				}}
			>
				<View>
					<Text style={{color: COLORS.primary, ...FONTS.h1}}>
						My Expenses
					</Text>
					<Text style={{color: COLORS.darkgray, ...FONTS.h2}}>
						Summary
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						marginTop: SIZES.padding,
						alignItems: "center",
					}}
				>
					<View
						style={{
							width: 50,
							height: 50,
							backgroundColor: COLORS.lightGray,
							borderRadius: 25,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Image
							source={icons.calendar}
							style={{
								width: 20,
								height: 20,
								tintColor: COLORS.lightBlue,
							}}
						/>
					</View>

					<View style={{marginLeft: SIZES.padding}}>
						<Text style={{color: COLORS.primary, ...FONTS.h2}}>
							9 Mar, 2022
						</Text>
						<Text style={{...FONTS.body3, color: COLORS.darkgray}}>
							18% more than last month
						</Text>
					</View>
				</View>
			</View>
		)
	}

	function renderCategoryHeader() {
		return (
			<View
				style={{
					flexDirection: "row",
					padding: SIZES.padding,
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<View>
					<Text style={{color: COLORS.primary, ...FONTS.h2}}>
						Categories
					</Text>
					<Text style={{color: COLORS.darkgray, ...FONTS.body3}}>
						12 total
					</Text>
				</View>
				<View style={{flexDirection: "row"}}>
					<TouchableOpacity
						style={{
							alignItems: "center",
							justifyContent: "center",
							height: 50,
							width: 50,
							backgroundColor:
								viewMode == "chart" ? COLORS.secondary : null,
							borderRadius: 25,
						}}
						onPress={() => {
							setViewMode("chart")
						}}
					>
						<Image
							source={icons.chart}
							resizeMode="contain"
							style={{
								width: 20,
								height: 20,
								tintColor:
									viewMode == "chart"
										? COLORS.white
										: COLORS.darkgray,
							}}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							alignItems: "center",
							justifyContent: "center",
							height: 50,
							width: 50,
							backgroundColor:
								viewMode == "list" ? COLORS.secondary : null,
							borderRadius: 25,
						}}
						onPress={() => {
							setViewMode("list")
						}}
					>
						<Image
							source={icons.menu}
							resizeMode="contain"
							style={{
								width: 20,
								height: 20,
								tintColor:
									viewMode == "list"
										? COLORS.white
										: COLORS.darkgray,
							}}
						/>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
	function renderCategoryList() {
		const renderItem = ({item}) => (
			<TouchableOpacity
				onPress={() => setSelectedCategory(item)}
				style={{
					flex: 1,
					flexDirection: "row",
					margin: 5,
					paddingVertical: SIZES.radius,
					paddingHorizontal: SIZES.padding,
					borderRadius: 5,
					backgroundColor: COLORS.white,
					...styles.shadow,
				}}
			>
				<Image
					source={item.icon}
					style={{
						width: 20,
						height: 20,
						tintColor: item.color,
					}}
				/>
				<Text
					style={{
						marginLeft: SIZES.base,
						color: COLORS.primary,
						...FONTS.h4,
					}}
				>
					{item.name}
				</Text>
			</TouchableOpacity>
		)

		return (
			<View style={{paddingHorizontal: SIZES.padding - 5}}>
				<Animated.View
					style={{height: categoryListHeightAnimationValue}}
				>
					<FlatList
						data={categories}
						renderItem={renderItem}
						keyExtractor={item => `${item.id}`}
						numColumns={2}
					/>
				</Animated.View>

				<TouchableOpacity
					style={{
						flexDirection: "row",
						marginVertical: SIZES.base,
						justifyContent: "center",
					}}
					onPress={() => {
						if (showMoreToggle) {
							Animated.timing(categoryListHeightAnimationValue, {
								toValue: 115,
								duration: 500,
								useNativeDriver: false,
							}).start()
						} else {
							Animated.timing(categoryListHeightAnimationValue, {
								toValue: 172.5,
								duration: 500,
								useNativeDriver: false,
							}).start()
						}

						setShowMoreToggle(!showMoreToggle)
					}}
				>
					<Text style={{...FONTS.body4}}>
						{showMoreToggle ? "LESS" : "MORE"}
					</Text>
					<Image
						source={
							showMoreToggle ? icons.up_arrow : icons.down_arrow
						}
						style={{
							marginLeft: 5,
							width: 15,
							height: 15,
							alignSelf: "center",
						}}
					/>
				</TouchableOpacity>
			</View>
		)
	}
	function processCategoryDataToDisplay() {
		// Filter expenses with "Confirmed" status
		let chartData = categories.map(item => {
			let confirmExpenses = item.expenses.filter(a => a.status == "C")
			var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0)

			return {
				name: item.name,
				y: total,
				expenseCount: confirmExpenses.length,
				color: item.color,
				id: item.id,
			}
		})

		// filter out categories with no data/expenses
		let filterChartData = chartData.filter(a => a.y > 0)

		// Calculate the total expenses
		let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0)

		// Calculate percentage and repopulate chart data
		let finalChartData = filterChartData.map(item => {
			let percentage = ((item.y / totalExpense) * 100).toFixed(0)
			return {
				label: `${percentage}%`,
				y: Number(item.y),
				expenseCount: item.expenseCount,
				color: item.color,
				name: item.name,
				id: item.id,
			}
		})

		return finalChartData
	}

	function setSelectCategoryByName(name) {
		let category = categories.filter(a => a.name == name)
		setSelectedCategory(category[0])
	}

	function renderChart() {
		let chartData = processCategoryDataToDisplay()
		let colorScales = chartData.map(item => item.color)
		let totalExpenseCount = chartData.reduce(
			(a, b) => a + (b.expenseCount || 0),
			0
		)

		console.log("Check Chart")
		console.log(chartData)

		if (Platform.OS == "ios") {
			return (
				<View style={{alignItems: "center", justifyContent: "center"}}>
					<VictoryPie
						data={chartData}
						labels={datum => `${datum.y}`}
						radius={({datum}) =>
							selectedCategory &&
							selectedCategory.name == datum.name
								? SIZES.width * 0.4
								: SIZES.width * 0.4 - 10
						}
						innerRadius={70}
						labelRadius={({innerRadius}) =>
							(SIZES.width * 0.4 + innerRadius) / 2.5
						}
						style={{
							labels: {fill: "white", ...FONTS.body3},
							parent: {
								...styles.shadow,
							},
						}}
						width={SIZES.width * 0.8}
						height={SIZES.width * 0.8}
						colorScale={colorScales}
						events={[
							{
								target: "data",
								eventHandlers: {
									onPress: () => {
										return [
											{
												target: "labels",
												mutation: props => {
													let categoryName =
														chartData[props.index]
															.name
													setSelectCategoryByName(
														categoryName
													)
												},
											},
										]
									},
								},
							},
						]}
					/>

					<View
						style={{position: "absolute", top: "42%", left: "42%"}}
					>
						<Text style={{...FONTS.h1, textAlign: "center"}}>
							{totalExpenseCount}
						</Text>
						<Text style={{...FONTS.body3, textAlign: "center"}}>
							Expenses
						</Text>
					</View>
				</View>
			)
		} else {
			// Android workaround by wrapping VictoryPie with SVG
			return (
				<View style={{alignItems: "center", justifyContent: "center"}}>
					<Svg
						width={SIZES.width}
						height={SIZES.width}
						style={{width: "100%", height: "auto"}}
					>
						<VictoryPie
							standalone={false} // Android workaround
							data={chartData}
							labels={datum => `${datum.y}`}
							radius={({datum}) =>
								selectedCategory &&
								selectedCategory.name == datum.name
									? SIZES.width * 0.4
									: SIZES.width * 0.4 - 10
							}
							innerRadius={70}
							labelRadius={({innerRadius}) =>
								(SIZES.width * 0.4 + innerRadius) / 2.5
							}
							style={{
								labels: {fill: "white", ...FONTS.body3},
								parent: {
									...styles.shadow,
								},
							}}
							width={SIZES.width}
							height={SIZES.width}
							colorScale={colorScales}
							events={[
								{
									target: "data",
									eventHandlers: {
										onPress: () => {
											return [
												{
													target: "labels",
													mutation: props => {
														let categoryName =
															chartData[
																props.index
															].name
														setSelectCategoryByName(
															categoryName
														)
													},
												},
											]
										},
									},
								},
							]}
						/>
					</Svg>
					<View
						style={{position: "absolute", top: "42%", left: "42%"}}
					>
						<Text style={{...FONTS.h1, textAlign: "center"}}>
							{totalExpenseCount}
						</Text>
						<Text style={{...FONTS.body3, textAlign: "center"}}>
							Expenses
						</Text>
					</View>
				</View>
			)
		}
	}

	function renderExpenseSummary() {
		let data = processCategoryDataToDisplay()

		const renderItem = ({item}) => (
			<TouchableOpacity
				style={{
					flexDirection: "row",
					height: 40,
					paddingHorizontal: SIZES.radius,
					borderRadius: 10,
					backgroundColor:
						selectedCategory && selectedCategory.name == item.name
							? item.color
							: COLORS.white,
				}}
				onPress={() => {
					let categoryName = item.name
					setSelectCategoryByName(categoryName)
				}}
			>
				{/* Name/Category */}
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<View
						style={{
							width: 20,
							height: 20,
							backgroundColor:
								selectedCategory &&
								selectedCategory.name == item.name
									? COLORS.white
									: item.color,
							borderRadius: 5,
						}}
					/>

					<Text
						style={{
							marginLeft: SIZES.base,
							color:
								selectedCategory &&
								selectedCategory.name == item.name
									? COLORS.white
									: COLORS.primary,
							...FONTS.h3,
						}}
					>
						{item.name}
					</Text>
				</View>

				{/* Expenses */}
				<View style={{justifyContent: "center"}}>
					<Text
						style={{
							color:
								selectedCategory &&
								selectedCategory.name == item.name
									? COLORS.white
									: COLORS.primary,
							...FONTS.h3,
						}}
					>
						{item.y} USD - {item.label}
					</Text>
				</View>
			</TouchableOpacity>
		)

		return (
			<View style={{padding: SIZES.padding}}>
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={item => `${item.id}`}
				/>
			</View>
		)
	}
	return (
		<View style={{flex: 1, backgroundColor: COLORS.lightGray2}}>
			{renderNavBar()}
			{renderHeader()}
			{renderCategoryHeader()}
			<ScrollView contentContainerStyle={{paddingBottom: 60}}>
				{viewMode == "list" && <View>{renderCategoryList()}</View>}
				{viewMode == "chart" && (
					<View>
						{renderChart()}
						{renderExpenseSummary()}
					</View>
				)}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	shadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 3,
	},
})
