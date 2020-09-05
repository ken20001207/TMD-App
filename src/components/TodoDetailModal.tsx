import React from "react";
import { Button, Dimensions, Text, View } from "react-native";
import Modal from "react-native-modal";
import Todo from "../models/Todo";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

interface Props {
    selectedTodo: Todo | undefined;
    setSelectedTodo: (todo: Todo | undefined) => void;
    deleteTodo: (todoID: string) => void;
}

const TodoDetailModal = (props: Props) => {
    return (
        <Modal
            isVisible={props.selectedTodo !== undefined}
            onBackdropPress={() => props.setSelectedTodo(undefined)}
            swipeDirection="down"
            deviceWidth={deviceWidth}
            style={{ marginTop: 600, margin: 0 }}
            deviceHeight={deviceHeight}
            onSwipeComplete={() => props.setSelectedTodo(undefined)}
        >
            <View style={{ flex: 1, backgroundColor: "rgb(40,40,40)", padding: 36, borderRadius: 24 }}>
                <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>{props.selectedTodo?.title}</Text>
                <Text style={{ color: "white", fontSize: 14, lineHeight: 24 }}>在 {props.selectedTodo?.ddl} 截止的 Deadline</Text>
                <View style={{ position: "absolute", bottom: 48, width: deviceWidth }}>
                    <Button
                        title="删除 Deadline"
                        onPress={() => (props.selectedTodo ? props.deleteTodo(props.selectedTodo.id) : props.setSelectedTodo(undefined))}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default TodoDetailModal;
