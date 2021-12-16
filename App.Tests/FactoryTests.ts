import { Test, TestSuite } from "xunit.ts";
import Factory from "../App/Factory";
import Signal from "../App/Signal";
import SignalService from "../App/SignalService";
import MockFactory from "./MockFactory";
import Mockito from "ts-mockito";
import Renderer from "../App/Renderer";
import ImageLoader from "../App/ImageLoader";

export default class FactoryTests extends TestSuite {
	@Test()
	async canCreateSignalService() {
		//arrange
		const signals: Signal[] = [];

		//act
		const signal_service = Factory.signalService("http://localhost", signals);

		//assert
		this.assert.instanceOf(SignalService, signal_service);
	}

	@Test()
	async canCreateRenderer() {
		//arrange
		const canvas = MockFactory.canvas();

		//act
		const renderer = Factory.renderer(Mockito.instance(canvas));

		//assert
		this.assert.instanceOf(Renderer, renderer);
	}

	@Test()
	async canCreateImageLoader() {
		//act
		const loader = Factory.imageLoader();

		//assert
		this.assert.instanceOf(ImageLoader, loader);
	}
}
