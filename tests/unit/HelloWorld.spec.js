import { mount } from '@vue/test-utils'
import CalendarHeatmap from '@/CalendarHeatmap.vue'

describe('CalendarHeatmap.vue', () => {
  it('data.msg return Hello World', () => {
    const wrapper = mount(CalendarHeatmap)
    expect(wrapper.vm.msg).toMatch('Hello World')
  })
})
