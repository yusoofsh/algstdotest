import { View } from "react-native"
import { Button } from "~/lib/components/button"
import { Text } from "~/lib/components/text"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button variant="outline" className="flex-row">
        <Text>Go To Form</Text>
      </Button>
    </View>
  )
}
