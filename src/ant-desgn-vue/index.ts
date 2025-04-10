import {
    Button, Input, Layout, Menu, Breadcrumb,
    Table, Form, Select, Popover, Modal, Switch,
    Checkbox, DatePicker, ConfigProvider,
    Tabs,Radio,Upload,Popconfirm,InputNumber
} from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';

const components:any[] = [
    Button,
    Input,
    Layout,
    Menu,
    Breadcrumb,
    Table,
    Form,
    Select,
    Popover,
    Modal,
    Switch,
    Checkbox,
    DatePicker,
    ConfigProvider,
    Tabs,
    Radio,
    Upload,
    Popconfirm,
    InputNumber
]

export default function setupAnt(app:any):void {
    components.forEach(item => {
        app.use(item)
    })
}
