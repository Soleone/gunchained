import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import FirebaseUI from '@/components/FirebaseUI.vue'

describe('FirebaseUI.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(FirebaseUI, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
