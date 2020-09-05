import {DateTimePicker} from "@react-native-community/datetimepicker";
import { useState } from "react";
import React, { useEffect, useState } from "react";
import  { Button, Dimensions, Text, TextInput, View } from "react-native";
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
            style={{ marginTop: 600, margin: 0 }}
            deviceHeight={deviceHeight}
            onSwipeComplete={() => props.toggleCreatingTodo()}
        >
            <View style={{ flex: 1, backgroundColor: "rgb(40,40,40)", padding: 36, borderRadius: 24 }}>
                <Text>创建新 Deadline</Text>
                <TextInput value={title} onChange={(e) => setTitle(e.target.toString())} />
                <DateTimePicker
                    testID="dateTimePicker"
                    value={deadline}
                    mode="datetime"
                    display="default"
                    onChange={(_e, d) => (d ? setDeadline(d) : {})}
                />
                <View style={{ position: "absolute", bottom: 48, width: deviceWidth }}>
                    <Button title="创建新 Deadline" onPress={() => props.createTodo(title, deadline)} />
                </View>
            </View>
        </Modal>
    );
};

export default CreateTodoModal;
