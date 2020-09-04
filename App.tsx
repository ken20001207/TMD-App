import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Alert, RefreshControl, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Col, Row } from "react-native-easy-grid";

interface Todo {
    id: string;
    title: string;
    status: "ONE_DAY_LEFT" | "ONE_WEEK_LEFT" | "MORE_THAN_ONE_WEEK_LEFT" | "EXPIRED";
    ddl: string;
}

export default function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);

    const downloadData = () => {
        setLoading(true);
        fetch("https://tmd.linyuanlin.com/api/todos")
            .then((res) => res.json())
            .then((res: Todo[]) => {
                res.sort((a, b) => new Date(a.ddl).getTime() - new Date(b.ddl).getTime());
                setTodos(res);
            })
            .then(() => setLoading(false))
            .catch(() => Alert.alert("获取失败，请重试刷新"));
    };

    useEffect(() => {
        downloadData();
    }, []);

    const getCardCorlos = (todo: Todo) => {
        switch (todo.status) {
            case "ONE_DAY_LEFT":
                return ["#ff4b2b", "#ff416c"];
            case "ONE_WEEK_LEFT":
                return ["#f5af19", "#f12711"];
            case "MORE_THAN_ONE_WEEK_LEFT":
                return ["#99f2c8", "#1f4037"];
            default:
                return ["#605c3c", "#3c3b3f"];
        }
    };

    return (
        <View style={styles.container}>
            <Row style={{ height: 100, marginTop: 48 }}>
                <Col size={8}>
                    <Text style={{ color: "white", fontSize: 36, fontWeight: "900" }}>TMD</Text>
                    <Text style={{ color: "gray", fontSize: 14, fontWeight: "700" }}>Too Many Deadlines!</Text>
                </Col>
                <Col size={4}>
                    <TouchableHighlight onPress={() => Alert.alert("hi")}>
                        <Text
                            style={{
                                overflow: "hidden",
                                borderRadius: 12,
                                backgroundColor: "orange",
                                color: "white",
                                padding: 8,
                                marginTop: 12,
                                textAlign: "center",
                                fontWeight: "900",
                            }}
                        >
                            新增 Deadline
                        </Text>
                    </TouchableHighlight>
                </Col>
            </Row>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => downloadData()}
                        tintColor="#ffffff"
                        title="下拉刷新"
                        titleColor="#ffffff"
                    />
                }
            >
                <Text style={{ color: "white", marginTop: 24, fontWeight: "bold" }}>即将到来 Coming</Text>
                {todos
                    .filter((todo) => todo.status !== "EXPIRED")
                    .map((todo) => (
                        <LinearGradient
                            key={todo.id}
                            start={[0, 0]}
                            end={[1, 1]}
                            colors={getCardCorlos(todo)}
                            style={{ marginVertical: 12, padding: 12, borderRadius: 6 }}
                        >
                            <Text style={{ color: "white", fontWeight: "600", fontSize: 24 }}>{todo.title}</Text>
                            <Text style={{ color: "white", fontWeight: "600", fontSize: 12 }}>将在 {todo.ddl} 过期</Text>
                        </LinearGradient>
                    ))}
                <Text style={{ color: "white", marginTop: 24, fontWeight: "bold" }}>已过期 Expired</Text>
                {todos
                    .filter((todo) => todo.status === "EXPIRED")
                    .map((todo) => (
                        <LinearGradient
                            key={todo.id}
                            start={[0, 0]}
                            end={[1, 1]}
                            colors={getCardCorlos(todo)}
                            style={{ marginVertical: 12, padding: 12, borderRadius: 6 }}
                        >
                            <Text style={{ color: "white", fontWeight: "600", fontSize: 24 }}>{todo.title}</Text>
                            <Text style={{ color: "white", fontWeight: "600", fontSize: 12 }}>已在 {todo.ddl} 过期</Text>
                        </LinearGradient>
                    ))}
            </ScrollView>
            <View style={{ marginVertical: 24 }}>
                <Text style={{ color: "rgb(80,80,80)", fontSize: 12 }}>Project TMD 是林沅霖在浙江大学</Text>
                <Text style={{ color: "rgb(80,80,80)", fontSize: 12 }}>2020短学期课程《Arduino 作品设计》制作的期末作业</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        backgroundColor: "black",
    },
});
