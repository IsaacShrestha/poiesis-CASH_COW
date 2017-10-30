import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('volunteers-ride-histories', 'Integration | Component | volunteers ride histories', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{volunteers-ride-histories}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#volunteers-ride-histories}}
      template block text
    {{/volunteers-ride-histories}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});