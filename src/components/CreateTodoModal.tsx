import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Button, Dimensions, Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import Modal from "react-native-modal";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

interface Props {
    creatingTodo: boolean;
    toggleCreatingTodo: () => void;
    createTodo: (title: string, deadline: Date) => void;
}

const CreateTodoModal = (props: Props) => {
    const [title, setTitle] = useState("");
    const [deadline, setDeadline] = useState<Date>(new Date());

    return (
        <Modal
            isVisible={props.creatingTodo}
            onBackdropPress={() => props.toggleCreatingTodo()}
            swipeDirection="down"
            deviceWidth={deviceWidth}
            style={{ marginTop: 300, margin: 0 }}
            deviceHeight={deviceHeight}
            onSwipeComplete={() => props.toggleCreatingTodo()}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, backgroundColor: "rgb(40,40,40)", padding: 36, borderRadius: 24 }}>
                    <Text style={{ color: "white", fontSize: 24 }}>创建新 Deadline</Text>

                    <View style={{ marginTop: 32 }}>
                        <Text style={{ color: "white", fontSize: 14 }}>標題</Text>
                        <TextInput
                            value={title}
                            onChange={(e) => setTitle(e.nativeEvent.text)}
                            style={{
                                borderBottomColor: "white",
                                borderBottomWidth: 2,
                                padding: 8,
                                color: "white",
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={{ color: "white", fontSize: 14 }}>截止时间</Text>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={deadline}
                            mode="datetime"
                            textColor="white"
                            onChange={(e, v) => (v ? setDeadline(v) : setDeadline(new Date()))}
                        />
                    </View>

                    <View style={{ position: "absolute", bottom: 48, width: deviceWidth }}>
                        <Button title="创建新 Deadline" onPress={() => props.createTodo(title, deadline)} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default CreateTodoModal;
