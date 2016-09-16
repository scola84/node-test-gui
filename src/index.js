import 'readable-stream/lib/_stream_duplex';
import 'dom-shims';

import { FastClick } from 'fastclick';
import http from 'http';

import { codec } from '@scola/api-codec-json';
import { WebSocket } from '@scola/websocket';

import { Connection as HttpConnection } from '@scola/api-http';
import { Connection as WsConnection } from '@scola/api-ws';

import { Router } from '@scola/api-router';
import { ClientFactory, clientRoutes } from '@scola/api-model';
import { MapCache } from '@scola/cache-map';

import { i18n as i18nFactory } from '@scola/d3-i18n';
import { router as routerFactory } from '@scola/d3-router';
import { menu as menuFactory } from '@scola/d3-menu';
import { app as appFactory } from '@scola/d3-app';
import { objectModel } from '@scola/d3-model';

import { data as stringData } from '@scola/i18n-data';

import { client as iClient } from '@scola/test';
import config from './config';

function parseAddress(connection) {
  return connection && connection.address().address || '';
}

function logRequest(request, response, next) {
  const date = '[' + new Date().toISOString() + ']';
  const address = parseAddress(request.connection());
  const id = request.method() + ' ' + request.url();

  console.log(date + ' ' + address + ' ' + id);
  next();
}

window.onload = () => {
  FastClick.attach(document.body);

  const appModel = objectModel('scola.test.app');

  const apiRouter = new Router();
  const guiRouter = routerFactory();

  const socket = new WebSocket('ws://' + config.api.address);

  const cache = new MapCache();

  const wsConnection = new WsConnection()
    .socket(socket)
    .router(apiRouter)
    .codec(codec);

  const httpConnection = new HttpConnection()
    .http(http)
    .codec(codec)
    .host(config.api.address);

  const factory = new ClientFactory()
    .cache(cache)
    .connection(wsConnection);

  const i18n = i18nFactory()
    .locale('nl_NL')
    .timezone('Europe/Amsterdam');

  apiRouter.filter(logRequest);

  stringData(i18n);
  clientRoutes(apiRouter, factory);

  const app = appFactory()
    .gesture(true)
    .slider(true)
    .media('64em', '48em', {
      'border-radius': '1em',
      'overflow': 'hidden',
      'transform': 'scale(1)'
    });

  app.root()
    .styles({
      'box-shadow': '0 0 20px #AAA',
      'opacity': 0
    })
    .transition()
    .duration(500)
    .style('opacity', 1);

  const menu = menuFactory()
    .media('21.333em', '42.667em')
    .gesture(true)
    .slider(true)
    .mode('over')
    .position('left')
    .border()
    .reset();

  app.append(menu, true);

  guiRouter.target('menu', () => menu);
  guiRouter.target('main', () => app);

  iClient(guiRouter, factory, i18n, httpConnection, wsConnection);

  guiRouter.target('menu').route('scola.test.list').default();
  guiRouter.target('main').route('scola.test.update').default();

  if (navigator.onLine === true) {
    wsConnection.once('open', () => {
      guiRouter.popState();
    });
  }

  guiRouter.popState();

  window.addEventListener('offline', () => {
    appModel
      .set('status', 'offline')
      .commit();
  });

  window.addEventListener('online', () => {
    appModel
      .set('status', 'online')
      .commit();

    socket.open();
  });

  applicationCache.addEventListener('updateready', () => {
    if (applicationCache.status === applicationCache.UPDATEREADY) {
      window.location.reload();
    }
  });
};
