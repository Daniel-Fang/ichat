/**
 * 聊天接口
 */
import Message from './Message';

export default interface Chat {
  id: number; // chatId
  icon: string; // 聊天的icon地址
  messageList: Message[]; // 消息列表
  creator: string; // 聊天的创建者
  to: string[]; // 参与聊天的人
  createTime?: string; // 创建日期
  top: boolean; // 是否置顶
  delete?: boolean; // 是否被移除
}