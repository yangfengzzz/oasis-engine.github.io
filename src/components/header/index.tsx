import {
  AppstoreAddOutlined,
  createFromIconfontCN,
  HomeOutlined,
  MenuOutlined,
  NotificationOutlined,
  PlayCircleOutlined,
  ReadOutlined,
  TwitterOutlined,
  YuqueOutlined,
  ZhihuOutlined,
} from '@ant-design/icons';
import { Button, Menu, Popover, Select } from 'antd';
import { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import config from '../../siteconfig.json';
import { styled } from '../../ui/design-system';
import { Flex } from '../../ui/Flex';
import { AppContext } from '../contextProvider';
import NavigationMenu from './components/NavigationMenu';
import SearchBox from './components/SearchBox';

import './index.less';

const { versions } = config;

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2808716_9ux7aqrqvq9.js', // 在 iconfont.cn 上生成
});
const { Option } = Select;

const LOGO_URL = 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*w3sZQpMix18AAAAAAAAAAAAAARQnAQ';

function Header() {
  const formatMessage = useIntl().formatMessage;
  const context = useContext(AppContext);
  const isZhCN = context.lang === 'zh-CN';

  const getMenu = (isMobile: boolean) => (
    <Menu mode={isMobile ? 'inline' : 'horizontal'} id='nav' key='nav'>
      <Menu.Item key='home' icon={<HomeOutlined />}>
        <Link to='/'>
          <FormattedMessage id='app.header.menu.home' />
        </Link>
      </Menu.Item>
      <Menu.SubMenu key='docs' icon={<ReadOutlined />} title={formatMessage({ id: 'app.header.menu.docs' })}>
        <Menu.ItemGroup title={formatMessage({ id: 'app.header.menu.engine' })}>
          <Menu.Item key='engine-docs'>
            <Link to={`/docs/${context.version}/${context.lang}`}>
              {formatMessage({ id: 'app.header.menu.engine.docs' })}
            </Link>
          </Menu.Item>
          <Menu.Item key='api'>
            <Link to={`/api/${context.version}`}>API</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title={formatMessage({ id: 'app.header.menu.artist' })}>
          <Menu.Item key='artist-docs'>
            <Link to={`/docs/latest/${context.lang}/artist-bake${context.lang === 'en' ? '' : '.zh-CN'}`}>
              {formatMessage({ id: 'app.header.menu.artist.docs' })}
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
        {isZhCN && (
          <Menu.ItemGroup title={formatMessage({ id: 'app.header.menu.editor' })}>
            <Menu.Item key='editor-docs'>
              <Link to={'/docs/latest/zh/editor.zh-CN'}>
                {formatMessage({ id: 'app.header.menu.editor.docs' })}
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        )}
      </Menu.SubMenu>
      <Menu.Item key='examples' icon={<PlayCircleOutlined />}>
        <Link to={`/examples/${context.version}`}>
          <FormattedMessage id='app.header.menu.engine.examples' />
        </Link>
      </Menu.Item>
      <Menu.SubMenu
        key='ecosystem'
        icon={<AppstoreAddOutlined />}
        title={formatMessage({ id: 'app.header.menu.ecosystem' })}
      >
        <Menu.ItemGroup title={formatMessage({ id: 'app.header.menu.ecosystem.tool' })}>
          <Menu.Item key='miniprogram'>
            <Link to={`/docs/latest/${context.lang}/miniprogram${context.lang === 'en' ? '' : '.zh-CN'}`}>
              {formatMessage({ id: 'app.header.menu.ecosystem.miniprogram' })}
            </Link>
          </Menu.Item>
          <Menu.Item key='gltfviewer'>
            <Link to={`/gltf-viewer`}>{formatMessage({ id: 'app.header.menu.ecosystem.gltfviewer' })}</Link>
          </Menu.Item>
          <Menu.Item key='createapp'>
            <a href='https://github.com/oasis-engine/create-oasis-app' target='_blank'>
              {formatMessage({ id: 'app.header.menu.ecosystem.createapp' })}
            </a>
          </Menu.Item>
          {isZhCN && (
            <Menu.Item key='editor'>
              <a href='https://oasis.alipay.com/editor' target='_blank'>
                {formatMessage({ id: 'app.header.menu.ecosystem.editor' })}
              </a>
            </Menu.Item>
          )}
        </Menu.ItemGroup>
        <Menu.ItemGroup title={formatMessage({ id: 'app.header.menu.ecosystem.animation' })}>
          <Menu.Item key='spine'>
            <Link to={`/docs/latest/zh/editor-component-spine.zh-CN`}>Spine</Link>
          </Menu.Item>
          <Menu.Item key='lottie'>
            <Link to={`/docs/latest/zh/editor-lottie.zh-CN`}>Lottie</Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
      <Menu.SubMenu
        key='community'
        icon={<NotificationOutlined />}
        title={formatMessage({ id: 'app.header.menu.community' })}
      >
        <Menu.Item key='zhihu' icon={<ZhihuOutlined />}>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.zhihu.com/column/c_1369047387231592448'
          >
            <FormattedMessage id='app.community.zhihu' />
          </a>
        </Menu.Item>
        <Menu.Item key='juejin' icon={<Icon type='icon-juejin' />}>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://juejin.cn/team/6930507995474313230/posts'
          >
            <FormattedMessage id='app.community.juejin' />
          </a>
        </Menu.Item>
        <Menu.Item key='yuque' icon={<YuqueOutlined />}>
          <a target='_blank' rel='noopener noreferrer' href='https://www.yuque.com/oasis-engine/blog'>
            <FormattedMessage id='app.community.yuque' />
          </a>
        </Menu.Item>
        <Menu.Item key='twitter' icon={<TwitterOutlined />}>
          <a target='_blank' rel='noopener noreferrer' href='https://twitter.com/OasisEngine'>
            <FormattedMessage id='app.community.twitter' />
          </a>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  const Header = styled(Flex, {
    padding: "0 20px",
    position: "relative",
    zIndex: 10,
    borderBottom: "1px solid $slate5"
  });

  return (
    <Media query='(max-width: 768px)'>
      {(isMobile) => (
        <Header justifyContent="between">
          {isMobile && (
            <Popover
              overlayClassName='popover-menu'
              placement='bottomRight'
              content={getMenu(true)}
              trigger='click'
              arrowPointAtCenter
            >
              <MenuOutlined className='nav-phone-icon' />
            </Popover>
          )}
          <Flex css={{flex: 1}}>
            <Link id='logo' to='/'>
              <img src={LOGO_URL} alt='Oasis Engine' />
            </Link>
            {!isMobile && <SearchBox></SearchBox>}
          </Flex>
          {!isMobile && (
            <div className='right-header'>
              <div id='menu'>
                <NavigationMenu />
              </div>
              <div id='lang'>
                <Button
                  size='small'
                  onClick={() => {
                    const newLang = context.lang === 'zh-CN' ? 'en' : 'zh-CN';
                    context.setLang(newLang);
                    localStorage.setItem('lang', newLang);
                  }}
                >
                  <FormattedMessage id='app.header.lang' />
                </Button>
              </div>
              <Select size='small' onChange={(e) => context.setVersion(e)} value={context.version}>
                {versions.map((v) => {
                  return (
                    <Option value={v} key={v}>
                      {v}
                    </Option>
                  );
                })}
              </Select>
            </div>
          )}
        </Header>
      )}
    </Media>
  );
}

export default Header;
