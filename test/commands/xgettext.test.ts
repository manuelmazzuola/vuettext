import {expect, test} from '@oclif/test'
import * as child_process from 'child_process'
import * as del from 'del'

describe('xgettext', () => {
  after(async () => {
    await del('locales')
    await del('i18n')
  })

  test
    .stub(child_process, 'execSync', (str: string) => {
      if (str === 'git config user.name') {
        return Buffer.from('V. Shimarulin', 'utf8')
      } else if (str === 'git config user.email') {
        return Buffer.from('developer@test.com', 'utf8')
      }
    })
    .stdout()
    .command(['xgettext'])
    .it('runs xgettext without args', async ctx => {
      expect(ctx.stdout).to.contain('**/*.{js,vue}')
      expect(ctx.stdout).to.contain('i18n/messages.pot')
    })

  test
    .stub(child_process, 'execSync', (str: string) => {
      if (str === 'git config user.name') {
        return Buffer.from('V. Shimarulin', 'utf8')
      } else if (str === 'git config user.email') {
        return Buffer.from('developer@test.com', 'utf8')
      }
    })
    .stdout()
    .command(['xgettext', '--output', 'locales/msg.pot'])
    .it('runs xgettext --output locales/msg.pot', async ctx => {
      expect(ctx.stdout).to.contain('locales/msg.pot')
    })

  test
    .stub(child_process, 'execSync', (str: string) => {
      if (str === 'git config user.name') {
        return Buffer.from('V. Shimarulin', 'utf8')
      } else if (str === 'git config user.email') {
        return Buffer.from('developer@test.com', 'utf8')
      }
    })
    .stdout()
    .command(['xgettext', 'src/**/*.vue'])
    .it('runs xgettext src/**/*.vue', async ctx => {
      expect(ctx.stdout).to.contain('src/**/*.vue')
    })

  test
    .stub(child_process, 'execSync', (str: string) => {
      if (str === 'git config user.name') {
        return Buffer.from('V. Shimarulin', 'utf8')
      } else if (str === 'git config user.email') {
        return Buffer.from('developer@test.com', 'utf8')
      }
    })
    .stdout()
    .command(['xgettext', '--output', 'locales/msg.pot', 'src/**/*.vue'])
    .it('runs xgettext --output locales/msg.pot src/**/*.vue', async ctx => {
      expect(ctx.stdout).to.contain('locales/msg.pot')
      expect(ctx.stdout).to.contain('src/**/*.vue')
    })
})
