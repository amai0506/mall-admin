import type { App } from 'vue';
// import { Icon } from './Icon';
import { Button } from './Button';
import {
  // Need
  Button as AntButton,
  Input,
  Layout,
  Card,
  Row,
  Col,
  Tabs,
  Upload,
  Modal,
  Tag,
  Form,
  Divider,
  Cascader,
} from 'ant-design-vue';

const compList = [AntButton.Group];

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });

  app
    .use(Input)
    .use(Button)
    .use(Layout)
    .use(Card)
    .use(Row)
    .use(Upload)
    .use(Modal)
    .use(Col)
    .use(Tag)
    .use(Form)
    .use(Divider)
    .use(Cascader)
    .use(Tabs);
}
