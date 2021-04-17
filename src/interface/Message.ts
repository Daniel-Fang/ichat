// 单条聊天记录
export default interface Message {
  id: number; // messageId
  message: string; // message 内容
  messageType: number; // message 类型 0: text; 1: image; 2: file;
  from: string; // 发送者
  avatar: string; // 发送者头像
  time: string; // 发送时间戳
}